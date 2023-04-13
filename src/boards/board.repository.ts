import { CustomRepository } from "src/decorator/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { Board } from "./board.entity";
import { BoardStatus } from "./boards.status.enum";
import { CreateBoardDto } from "./dto/create-board.dto";

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {

    async createBoard(createBoardDto: CreateBoardDto):Promise<Board> {
        const { title, description } = createBoardDto
        const board = this.create({
            title,
            description,
            status: BoardStatus.PUBLIC
        });

        await this.save(board);
        return board;
    }
}
