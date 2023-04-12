import { Body, Controller, Delete, Get, Param, Post, Patch, UsePipes, ValidationPipe } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validarion-pipe';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService){}

    @Get('/')
    getAllBoard(): Array<Board> {
        return this.boardsService.getAllBoards();
    }

    @Get('/:id')
    getBoardId(@Param('id') id: string): Board {
        return this.boardsService.getBoardById(id);
    }

    @Post()
    @UsePipes(ValidationPipe) // 핸들러 레벨에서 유효성 검사
    createBoard(@Body() createBoardDto: CreateBoardDto): Board {
        return this.boardsService.createBoard(createBoardDto)
    }

    @Delete()
    deleteBoard(@Param('id') id: string): void{
        return this.boardsService.deleteBoard(id);
    }

    @Patch('/:id/status')
    updateBoardStatus(@Param('id') id: string, @Body('status', BoardStatusValidationPipe) status: BoardStatus) {
        return this.boardsService.updateBoardStatus(id, status);
    };
}

