import React, {useState} from "react";
import cls from "./Pagination.module.scss"

let Pagination = ({portionSize = 30, ...props}) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
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
                props.onPageChanged(page)
            }} className={props.currentPage === page && cls.selected_page} key={page}>{page}</span>)}

            { portionCount > portionNumber &&
                <button className={cls.change_page}
                        onClick={() => setPortionNumber((portionNumber+1))}>Вперед</button>}
        </div>
    )
}
export default Pagination;