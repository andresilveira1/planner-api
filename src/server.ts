import fastify from 'fastify'
import cors from '@fastify/cors'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

import { createTrip } from './Routes/Trip/create-trip'
import { getTripDetails } from './Routes/Trip/get-trip-details'
import { updateTrip } from './Routes/Trip/update-trip'
import { confirmTrip } from './Routes/Trip/confirm-trip'
import { getParticipants } from './Routes/Participant/get-participants'
import { getParticipant } from './Routes/Participant/get-participant'
import { confirmParticipant } from './Routes/Participant/confirm-participant'
import { createActivity } from './Routes/Activity/create-activity'
import { getActivities } from './Routes/Activity/get-activities'
import { createLink } from './Routes/Link/create-link'
import { getLinks } from './Routes/Link/get-links'
import { createInvite } from './Routes/Participant/create-invite'
import { errorHandler } from './error-handler'
import { env } from './env'

const app = fastify()

app.register(cors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.setErrorHandler(errorHandler)

app.register(createTrip)
app.register(getTripDetails)
app.register(updateTrip)
app.register(confirmTrip)
app.register(getParticipants)
app.register(getParticipant)
app.register(confirmParticipant)
app.register(createActivity)
app.register(getActivities)
app.register(createLink)
app.register(getLinks)
app.register(createInvite)

app.listen({ port: env.PORT }).then(() => {
  console.log('Server running!')
})
