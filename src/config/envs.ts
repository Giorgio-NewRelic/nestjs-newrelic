import 'dotenv/config'
import * as Joi from 'joi'

interface EnvVars {
    NEW_RELIC_APP_NAME: string
    NEW_RELIC_LICENSE_KEY: string
}

const envsSchema = Joi.object({
    NEW_RELIC_APP_NAME: Joi.string().required(),
    NEW_RELIC_LICENSE_KEY:Joi.string().required()
})
.unknown(true)

const {error, value} = envsSchema.validate({
    ...process.env,
})

if(error){
    throw new Error(`Config validation error: ${error.message}`)
}

const envVars: EnvVars = value

export const envs = {
    newrelicAppName: envVars.NEW_RELIC_APP_NAME,
    newrelicLicenseKey: envVars.NEW_RELIC_LICENSE_KEY
}