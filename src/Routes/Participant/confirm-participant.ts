import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { prisma } from '../../Lib/prisma'
import { ClientError } from '../../Errors/client-error'
import { env } from '../../env'

export async function confirmParticipant(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/participants/:participantId/confirm',
    {
      schema: {
        params: z.object({
          participantId: z.string().uuid(),
        }),
      },
    },
    async (req, reply) => {
      const { participantId } = req.params

      const participant = await prisma.participant.findUnique({
        where: {
          id: participantId,
        },
      })

      if (!participant) {
        throw new ClientError('Participant not found.')
      }

      if (participant.is_confirmed) {
        return reply.redirect(
          `${env.APP_BASE_URL}/trips/${participant.trip_id}`,
        )
      }

      await prisma.participant.update({
        where: { id: participantId },
        data: { is_confirmed: true },
      })

      return reply.redirect(`${env.APP_BASE_URL}/trips/${participant.trip_id}`)
    },
  )
}
