import cls from "./News.module.scss"
import {connect} from "react-redux";
import NewsPost from "./NewsPost";
import {addLike, delLike} from "../../redux/news_reducer";
import "animate.css"

const News = ({newsList, addLike, delLike}) =>{
    return(
        <div className={cls.news}>
            <h1 className={"animate__animated animate__fadeInRight" + " " + cls.news_header}>
                Новости
            </h1>
            <div className={"animate__animated animate__fadeIn" + " " + cls.news_list}>
            {newsList.map(news =>
                <NewsPost key={news.id} id={news.id} annotation={news.annotation} newsText={news.newsText}
                          newsPhoto={news.newsPhoto} likes={news.likes} addLike={addLike}
                          likeWasAdd={news.likeWasAdd} delLike={delLike}/>
            )}
            </div>
        </div>
    )
}

export default connect((state) => ({
    newsList: state.news.newsList
}), {addLike, delLike})(News);
