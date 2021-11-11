import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        //private authService: AuthService
    ) {}

    create(user: User): Observable<User> {
        /*return this.authService.hashPassword(user.password).pipe(
            switchMap((passwordHash: string) => {
                const newUser = new UserEntity();
                newUser.name = user.name;
                newUser.username = user.username;
                newUser.email = user.email;
                newUser.password = passwordHash;
                newUser.role = UserRole.USER;

                return from(this.userRepository.save(newUser)).pipe(
                    map((user: User) => {
                        const {password, ...result} = user;
                        return result;
                    }),
                    catchError(err => throwError(err))
                )
            })
        )*/
        return from(this.userRepository.save(user));
    }

    findAll(): Observable<User[]> {
        return from(this.userRepository.find());/*.pipe(
            map((users: User[]) => {
                users.forEach(function (v) {delete v.password});
                return users;
            })
        );*/
    }

    findOne(id: number): Observable<User> {
        return from(this.userRepository.findOne({id}/*, {relations: ['blogEntries']}*/)).pipe(
            map((user: User) => {
                const {password, ...result} = user;
                return result;
            } )
        )
    }
    deleteOne(id: number): Observable<any> {
        return from(this.userRepository.delete(id));
    }

    updateOne(id: number, user: User): Observable<any> {
        /*delete user.email;
        delete user.password;
        delete user.role;*/

        return from(this.userRepository.update(id, user));/*.pipe(
            switchMap(() => this.findOne(id))
        );*/
    }

}
