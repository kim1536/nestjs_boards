import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { BoardStatus } from './boards.status.enum';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validarion-pipe';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decoretor';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard()) // token 값 유무
export class BoardsController {
  constructor(private boardsService: BoardsService) {}
  private logger = new Logger('BoardsController');

  // @Get('/')
  // getAllBoard(): Array<Board> {
  //     return this.boardsService.getAllBoards();
  // }

  // 모든 개시글을 가져온다.
  // @Get('/')
  // getAllBoard(): Promise<Array<Board>> {
  //   return this.boardsService.getAllBoards();
  // }

  // 특종 유조가 적성한 개시글만 가져온다.
  @Get('/')
  getAllBoard(
    @GetUser() user: User
  ): Promise<Array<Board>> {
    this.logger.verbose(`User ${user.username} trying to get all boards `)
    return this.boardsService.getAllBoards(user);
  }
  // @Get('/:id')
  // getBoardId(@Param('id') id: string): Board {
  //     return this.boardsService.getBoardById(id);
  // }

  @Get('/:id')
  getBoardId(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  // @Post()
  // @UsePipes(ValidationPipe) // 핸들러 레벨에서 유효성 검사
  // createBoard(@Body() createBoardDto: CreateBoardDto): Board {
  //     return this.boardsService.createBoard(createBoardDto)
  // }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user:User
  ): Promise<Board> {
    this.logger.verbose(`User ${user.username} creating a new board. Payload ${JSON.stringify(createBoardDto)}`)
    return this.boardsService.createBoard(createBoardDto, user);
  }

  // @Delete()
  // deleteBoard(@Param('id') id: string): void{
  //     return this.boardsService.deleteBoard(id);
  // }

  @Delete('/:id')
  deleteBoard(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user:User
    ): Promise<void> {
    return this.boardsService.deleteBoard(id, user);
  }

  // @Patch('/:id/status')
  // updateBoardStatus(@Param('id') id: string, @Body('status', BoardStatusValidationPipe) status: BoardStatus) {
  //     return this.boardsService.updateBoardStatus(id, status);
  // }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ) {
    return this.boardsService.updateBoardStatus(id, status);
  }
}
