import cls from "./Main.module.scss"
import logoImg from "./../../assets/img/logo.png"
import "animate.css"

const Main = () => {
    return (
        <div className={cls.main}>
            <div className={cls.logo}>
                <img className={"animate__animated animate__rotateIn"} src={logoImg} alt=""/>
                <div className={cls.container_main_header}>
                    <h1 className={cls.main_header + " " + "animate__animated animate__fadeInUp"}>Slave</h1>
                </div>
            </div>


        </div>
    )
}

export default Main;