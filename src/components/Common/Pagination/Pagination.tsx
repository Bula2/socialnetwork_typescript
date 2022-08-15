import React, {useState} from "react";
import cls from "./Pagination.module.scss"

type PropsType = {
    portionSize?: number,
    totalUsersCount: number,
    pageSize: number,
    onPageChanged: (page: number) => void
    currentPage: number,
}

let Pagination: React.FC<PropsType> = ({portionSize = 30, totalUsersCount,
                                           pageSize, onPageChanged, currentPage}) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionBorder = (portionNumber - 1) * portionSize +1;
    let rightPortionBorder = portionNumber * portionSize;


    return (
        <div className={cls.numbers_page}>

            { portionNumber >1 &&
            <button className={cls.change_page}
                    onClick={() => setPortionNumber((portionNumber-1))}>Назад</button>}

            {pages
                .filter(page => page >= leftPortionBorder && page<=rightPortionBorder)
                .map(page => <span onClick={() => {
                onPageChanged(page)
            }} className={currentPage === page && cls.selected_page} key={page}>{page}</span>)}

            { portionCount > portionNumber &&
                <button className={cls.change_page}
                        onClick={() => setPortionNumber((portionNumber+1))}>Вперед</button>}
        </div>
    )
}
export default Pagination;