import * as newrelic from 'newrelic'
import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from '@nestjs/common'
import {Response} from 'express'

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const status = exception.getStatus()
        const exceptionResponse: any = exception.getResponse()

        newrelic.addCustomAttributes({
            errorStatus: status,
            errorMessage: exceptionResponse.message || 'Error de validación',
            errorDetails: JSON.stringify(exceptionResponse)
        })

        response.status(status).json({
            statusCode: status,
            message: exceptionResponse.message || 'Error de validación',
            errors: exceptionResponse.errors || []
        })
    }

}