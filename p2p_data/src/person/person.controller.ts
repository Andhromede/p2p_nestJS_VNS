import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PersonService } from './person.service';
import { Person } from '../entities/person.entity';

@Controller('person')
export class PersonController {

    constructor(private readonly personService: PersonService) { }

    @Get()
    GetAllPersons() {
        return this.personService.GetAllPersons();
    }

    @Get()
    GetPersonById(@Param('id') personId : number) {
        return this.personService.GetPersonById(personId);
    }

    // @Post()
    // async create(@Body() createPersonDto: CreatePersonDto): Promise<Person> {
    //     return this.personService.create(createPersonDto);
    // }








    // @Get()
    // async findOne(): Promise<Person> {
    //     return this.personService.findOne();
    // }

    // @Get()
    // findByEmail() {
    //     return this.personService.findByEmail(email: string);
    // }



}
