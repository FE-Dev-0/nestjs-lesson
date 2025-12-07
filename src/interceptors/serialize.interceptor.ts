import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface Response<T> {
  data: T
}

@Injectable()
export class SerializeInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return plainToInstance(this.dto, data, {
          // 设置为true之后，所有经过该interceptor的接口都需要设置Expose或者Exclude
          // Expose设置哪些字段需要暴露、Exclude设置哪些字段不需要暴露
          excludeExtraneousValues: true,
        })
      }),
    )
  }
}
