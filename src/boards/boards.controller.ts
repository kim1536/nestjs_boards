import { Body, Controller, Delete, Get, Param, Post, Patch, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardStatus } from './boards.status.enum';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validarion-pipe';
import { Board } from './board.entity';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService){}

    // @Get('/')
    // getAllBoard(): Array<Board> {
    //     return this.boardsService.getAllBoards();
    // }

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
    createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardsService.createBoard(createBoardDto)
    }

    // @Delete()
    // deleteBoard(@Param('id') id: string): void{
    //     return this.boardsService.deleteBoard(id);
    // }

    // @Patch('/:id/status')
    // updateBoardStatus(@Param('id') id: string, @Body('status', BoardStatusValidationPipe) status: BoardStatus) {
    //     return this.boardsService.updateBoardStatus(id, status);
    // };
}

