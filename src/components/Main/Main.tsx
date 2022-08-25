import cls from "./Main.module.scss"
import "animate.css"
const logoImg =  require("./../../assets/img/logo.png")

const Main = () => {
    return (
        <div className={cls.main}>
            <div className={cls.logo}>
                <img className={"animate__animated animate__rotateIn"} src={logoImg} alt=""/>
                <div className={cls.container_main_header}>
                    <h1 className={cls.main_header + " " + "animate__animated animate__fadeInUp"}>VSea</h1>
                </div>
            </div>


        </div>
    )
}

export default Main;