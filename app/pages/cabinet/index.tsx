import React from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  makeStyles,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { Session } from 'next-auth'
import { getSession } from 'next-auth/client'

import CabinetMenu from '../../components/CabinetMenu/CabinetMenu'
import AppLayout from '../../layouts/AppLayout'
import { useTranslation } from '../../utils/localization'

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(3),
  },
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}))

type CabinetPageProps = {
  session: Session
}

const Cabinet: NextPage<CabinetPageProps> = ({ session }) => {
  const router = useRouter()
  const t = useTranslation(router?.locale)
  const theme = useTheme()
  const isPhone = useMediaQuery(theme.breakpoints.down('md'))
  const styles = useStyles()
  const title = router?.locale === 'en' ? 'Personal cabinet' : 'Персональный кабинет'
  return (
    <AppLayout title={title}>
      <Container className={styles.container} maxWidth="lg">
        <Grid container spacing={3} justifyContent={isPhone ? 'center' : 'flex-start'}>
          <CabinetMenu />
          <Grid item xs={12} md={isPhone ? 11 : 9}>
            <Card className={styles.root}>
              <CardContent>
                <Typography className={styles.title} color="textSecondary" gutterBottom>
                  {t.page.cabinet.information}
                </Typography>
                <Typography variant="h5" component="h2">
                  {session?.user?.email}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={async () => router.push('/cabinet/orders')}>
                  {t.page.cabinet.showOrders}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </AppLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  if (!session?.user) {
    return {
      props: {},
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
  return { props: { session } }
}

export default Cabinet
