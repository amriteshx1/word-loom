import phone from "../assets/call.png";
import mail from "../assets/mail.png";

function Support(){
    return(
        <>
        <div className="min-h-full w-[90%] flex flex-col justify-start items-center gap-[4vh] p-[2vh] bg-neutral-800 motion-preset-slide-up motion-duration-500">
            <div className="w-[100%] flex flex-col justify-center items-center p-[2vh]">
            <p className="lg:text-[2.3vw] text-[2.3vh] text-white font-bold">Get In Touch!</p>
            <hr className="lg:w-[30%] w-[50%] border-2 border-white" />
            </div>

            <p className="lg:text-[1.7vw] text-[1.8vh] text-white font-medium">Have a question, feedback, or need help with something? We're here to assist you.🤝</p>

            <div className="w-full flex flex-col justify-center items-start rounded-2xl lg:p-[7vh] p-[3vh] gap-[2vh] mt-[6vh] mb-[6vh] bg-neutral-900">
                <p className="lg:text-[1.4vw] text-[1.5vh] text-white font-medium">✨ Feel free to reach out for support regarding your account, posts, or any technical issues.</p>
                <div className="w-full flex flex-col justify-center items-start gap-[2vh] p-[3vh]">
                <p className="lg:text-[1.2vw] text-[1.4vh] text-white">You can contact us anytime at:</p>
                <p className="flex justify-center items-center gap-[2vh] lg:text-[1.1vw] text-[1.3vh] text-white"><img src={phone} alt="call-logo" className="lg:h-[2.7vh] h-[2.1vh] object-cover"/>  08831-3882-011</p>
                <p className="flex justify-center items-center gap-[2vh] lg:text-[1.1vw] text-[1.3vh] text-white"><img src={mail} alt="email-logo" className="lg:h-[2.7vh] h-[2.1vh] object-cover" />  support@wordloom.com</p>
                <p className="lg:text-[1.2vw] text-[1.4vh] text-white">Our team typically responds within 24–48 hours.</p>
                </div>
            </div>

            <p className="lg:text-[1.4vw] text-[1.6vh] text-white font-medium ">Thank you for being a part of our platform. Your feedback helps us grow and serve you better! 🤍</p>
            

        </div>
        </>
    )
};

export default Support;