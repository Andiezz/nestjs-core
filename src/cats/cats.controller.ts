import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Redirect,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Observable, of } from 'rxjs';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  @Redirect('https://docs.nestjs.com', 302)
  findAll() {
    return this.catsService.findAll();
  }

  // Redirection
  @Get('redirect')
  @Redirect('https://docs.nestjs.com', 302)
  redirect() {
    console.log('Redirecting to https://docs.nestjs.com');

    // overwrite redirect response
    return { url: 'https://docs.nestjs.com/v5/' };
  }

  // Observable streams
  @Get('stream')
  observable(): Observable<any[]> {
    return of([1, 2, 3, 4, 5]);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catsService.remove(+id);
  }
}
