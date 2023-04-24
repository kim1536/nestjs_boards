import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './boards.status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(private readonly boardRepository: BoardRepository) {}
  // const boards = [];

  // getAllBoards():Array<Board> {
  //     return this.boards
  // }

  //모든 개시글을 가젹온다
  // async getAllBoards(): Promise<Array<Board>> {
  //   return await this.boardRepository.find();
  // }

  // 특정 유저가 작성한 개시글만 가져온다
  async getAllBoards(
    user: User
  ): Promise<Array<Board>> {
    const query = this.boardRepository.createQueryBuilder('board');
    query.where('board.userId = :userId', {userId: user.id})

    const boards = await query.getMany()
    return boards;
  }

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

  async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return await this.boardRepository.createBoard(createBoardDto, user);
  }

  // getBoardById(id: string): Board {
  //     const found = this.boards.find((board)=> board.id === id);
  //     if (!found) {
  //         throw new NotFoundException(``);
  //     }
  //     return found
  // }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return found;
  }

  // deleteBoard(id: string): void {
  //     const found = this.getBoardById(id);
  //     this.boards = this.boards.filter((board)=> board.id !== found.id);
  // }

  async deleteBoard(id: number, user: User): Promise<void> {
    const result = await this.boardRepository.delete({id, user:{id:user.id}});

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Borad with id ${id}`);
    }
  }

  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //     const board = this.getBoardById(id);
  //     board.status = status;
  //     return board;
  // }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);

    board.status = status;
    await this.boardRepository.save(board);

    return board;
  }
}
