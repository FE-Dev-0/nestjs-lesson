import { Catch, ExceptionFilter } from '@nestjs/common'

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch() {}
}
