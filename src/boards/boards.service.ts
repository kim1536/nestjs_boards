import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './boards.status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';


@Injectable()
export class BoardsService {
    constructor( 
        private readonly boardRepository: BoardRepository 
    ) {} 

    // getAllBoards():Array<Board> {
    //     return this.boards
    // }

    // createBoard(createBoardDto: CreateBoardDto) {
    //     const { title, description } = createBoardDto
    //     const board: Board = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: BoardStatus.PUBLIC
    //     }

    //     this.boards.push(board);
    //     return board;
    // }

    createBoard(createBoardDto: CreateBoardDto):Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto);
    }

    // getBoardById(id: string): Board {
    //     const found = this.boards.find((board)=> board.id === id);
    //     if (!found) {
    //         throw new NotFoundException(``);
    //     }
    //     return found
    // }

    async getBoardById(id: number): Promise<Board> {
        const found = await this.boardRepository.findOneBy({id})
        if (!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
        return found;
    }

    // deleteBoard(id: string): void {
    //     const found = this.getBoardById(id);
    //     this.boards = this.boards.filter((board)=> board.id !== found.id);
    // }

    // updateBoardStatus(id: string, status: BoardStatus): Board {
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }
}
