import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { gql, useMutation } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button, createStyles, makeStyles, Paper, TextField, Typography,
} from '@material-ui/core'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { useSnackbar } from 'notistack'
import * as yup from 'yup'

import { useTranslation } from '../../utils/localization'
import { updatePhone, updatePhoneVariables } from './__generated__/updatePhone'

type FormData = {
  phone: string;
}

export const UPDATE_USER_PHONE = gql`
    mutation updatePhone($phone: String!, $meId: ID!) {
        updateUser(input: {data: {customerInfo: {phone: $phone}},where: {id: $meId}}) {
            user {
                customerInfo {
                    phone
                }
            }
        }
    }
`

const useStyles = makeStyles((theme) => createStyles({
  root: {
    padding: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(1),
  },
  field: {
    marginTop: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(1),
  },
}))

const phone = /^[+]?[1-99]?[(,\s]?([0-9]{3})[),\s]?[-.●]?([0-9]{3})[-.●]?([0-9]{2})[-.●]?([0-9]{2})/

const PhoneSetForm = () => {
  const [session, loading] = useSession()
  const styles = useStyles()

  const router = useRouter()
  const t = useTranslation(router?.locale)

  const schema = useMemo(() => yup.object().shape({
    phone: yup.string()
      .matches(phone, t.components.PhoneSetForm.wrongPhone)
      .required(t.components.PhoneSetForm.phoneRequired),
  }), [t])

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const [updatePhone] = useMutation<updatePhone, updatePhoneVariables>(UPDATE_USER_PHONE)

  const { register, handleSubmit, errors } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const { enqueueSnackbar } = useSnackbar()

  const handleUpdate = async (data: FormData) => {
    try {
      await updatePhone({
        variables: { meId: session?.id as string, phone: data.phone },
        context: { headers: { authorization: `Bearer ${session?.jwt}` } },
      })
      enqueueSnackbar(t.components.PhoneSetForm.phoneSuccessUpdate, { variant: 'success' })
    } catch (e: any) {
      enqueueSnackbar(e.message, { variant: 'error' })
    }
  }

  return (
    <Paper component="form" onSubmit={handleSubmit(handleUpdate)} className={styles.root}>
      <Typography variant="subtitle1" className={styles.title}>{t.components.PhoneSetForm.updatePhone}</Typography>
      <TextField
        inputRef={register}
        name="phone"
        id="phone-input"
        label={t.components.PhoneSetForm.phoneLabel}
        variant="outlined"
        disabled={loading}
        error={Boolean(errors.phone)}
        helperText={errors.phone?.message}
        className={styles.field}
        fullWidth
      />
      <Button
        type="submit"
        disabled={loading}
        variant="outlined"
        color="primary"
        className={styles.button}
        fullWidth
      >
        {t.components.PhoneSetForm.updateButton}
      </Button>
    </Paper>
  )
}

export default PhoneSetForm
