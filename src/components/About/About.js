import styles from "./About.module.css";

const About = () => {
    return (
        <div className={styles["container"]}>
            <div className={styles['content']}>
                <p><i className="fas fa-paw"> Тук, в DoGroomig, се гордеем с това, че предлагаме възможно най-добрата услуга, достъпна както за Вас, така и за Вашия домашен любимец. Консултацията ни позволява да разберем личността на Вашето куче, да научим повече за тяхната груминг история и ни позволява да създадем доверие в собственика. Известно е, че няма две еднакви кучета и че животните реагират по различен начин на обкръжението си и на стреса, под който може да са подложени, особено ако не са били подстригвани преди. Това първо посещение ни позволява да ги успокоим.</i></p>
                <p><i className="fas fa-paw"> Грумингът е много важен за Вашето куче. Ако те имат приятно преживяване, започвайки от ранна възраст, то това помага за изграждане увереност в кучето си и те ще се чувстват комфортно да се срещат и да общуват с нови хора или други животни. Ако имат стресиращо преживяване, те могат да бъдат тревожни и нервни, когато посещават нови места като салони за подстригване или дори ветеринарни кабинети.</i></p>
                <p><i className="fas fa-paw"> Вашият домашен любимец винаги ще бъде третиран с любов, нежност и по неагресивен начин. Ние вземаме предпазни мерки, за да гарантираме, че Вашият домашен любимец се чувства напълно комфортно, за да направим посещението възможно най-приятно. Ние също НИКОГА не използваме упойки!</i></p>
                <p><i className="fas fa-paw"> Независимо дали ще поглезите Вашия домашен любимец с Топ Изживяване или просто Баня и Поддръжка, за да ги освежите за специално събитие, ние разбираме, че всяко куче е уникално и ще работим в тясно сътрудничество с Вас, за да гарантираме постигането на желания резултат.</i></p>
                <p><i className="fas fa-paw"> Нашият личен, уникален подход в груминга позволява на Вас и Вашия домашен любимец да се чувствате сигурни, че получавате най-добрите грижи от висококвалифициран специалист.</i></p>
            </div>
        </div>
    );
}

export default About;