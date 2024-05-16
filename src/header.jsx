import { FaHistory, FaUser } from "react-icons/fa";
import { MdCancel, MdArrowBack } from "react-icons/md";
import { useState, useEffect } from "react"
import { 
    createUserWithEmailAndPassword, 
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth"
import { 
    getFirestore, 
    collection, 
    getDocs,
} from 'firebase/firestore'
import { auth, db } from "./firebase-config"

function Header(){
    let hist = false
    let userpg = false
    let userop = false
    let loginpage = false
    let signuppage = false
    let loggedin = false
    let profilepage = false

    if (auth.currentUser) loggedin = true
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const currentDate = new Date().toLocaleDateString()
    const [exerciseHist, setExerciseHist] = useState([{}])
    const historyCollectionRef = collection(db, "History")
    useEffect(() => {
        const getExerciseHist = async () => {
            //read from data
            //set exercisehist
            try {
                const data = await getDocs(historyCollectionRef)
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(), 
                    id: doc.id,
                }))
                setExerciseHist(filteredData)
                //console.log(exerciseHist)
            } catch(error) {
                console.log(error)
            }
        }
        getExerciseHist()
    })
    const [user, setUser] = useState({})
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => setUser(currentUser))
        // Notice the empty dependency array, there to make sure the effect is only run once when the component mounts
      }, []) 

    const register = async () => {
        try {
        const user = await createUserWithEmailAndPassword(
            auth, 
            registerEmail, 
            registerPassword
        )
        loggedin = true
        signuppageoff()
        } catch (error) {
            console.log(error.message)
        }
    }

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth, 
                loginEmail,
                loginPassword
            )
            loggedin = true
            loginpageoff()
            } catch (error) {
                console.log(error.message)
            }
    }

    const logout = async () => {

        await signOut(auth);
        loggedin = false
        useroptionoff()
    }
    function useroptiondisplay(){
        if (loggedin){
            if(userop) {
                document.getElementById("useroptionloggedin").style.cssText = 'display: none;'
                userop = false
            } else {
                document.getElementById("useroptionloggedin").style.cssText = 'display: inline-block;'
                userop = true
                profilepageoff();
            }
        } else {
            if(userop) {
                document.getElementById("useroption").style.cssText = 'display: none;'
                userop = false
            } else {
                document.getElementById("useroption").style.cssText = 'display: inline-block;'
                userop = true
                loginpageoff();
                signuppageoff();
            }
        }
        
    }
    
    function useroptionoff() {
        document.getElementById("useroption").style.cssText = 'display: none;'
        document.getElementById("useroptionloggedin").style.cssText = 'display: none;'
        userop = false
    }
    function historydisplay(){
        if (hist){
            historyoff()
        } else {
            document.getElementById("historytab").style.cssText = 'display: block;'
            hist = true
            if(userpg) userpageoff()
        }
    }

    function historyoff(){
        document.getElementById("historytab").style.cssText = 'display: none;'
        hist = false
    }

    function loginpagedisplay(){
        if (loginpage) {
            document.getElementById("loginpage").style.cssText = "display: none;"
            loginpage = false
        } else {
            document.getElementById("loginpage").style.cssText = "display: block;"
            loginpage = true
            useroptionoff()
        }
    }
    
    function loginpageoff(){
        document.getElementById("loginpage").style.cssText = "display: none;"
        loginpage = false
    }

    function signuppagedisplay(){
        if (signuppage) {
            document.getElementById("signuppage").style.cssText = 'display: none;'
            signuppage = false
        } else {
            document.getElementById("signuppage").style.cssText = 'display: block;'
            signuppage = true
            useroptionoff()
        }
    }

    function signuppageoff() {
        document.getElementById("signuppage").style.cssText = 'display: none;'
        signuppage = false
    }

    function profilepagedisplay(){
        if (profilepage) {
            document.getElementById("profilepage").style.cssText = 'display: none;'
            profilepage = false
        } else {
            document.getElementById("profilepage").style.cssText = 'display: block;'
            profilepage = true
            useroptionoff()
        }
    }

    function profilepageoff() {
        document.getElementById("profilepage").style.cssText = 'display: none;'
        profilepage = false
    }
    return(
    <section>
        <div className="header">
            <div className="header-icon" id="historybutton" onClick={()=>historydisplay()}><FaHistory/></div>
            <div className="header-icon" id="userbutton" onClick={()=>useroptiondisplay()}><FaUser/></div>
        </div>
        <div className="useroption" id="useroption">
            <div className="useroptiondropdown" id="loginoption" onClick={()=>loginpagedisplay()}>Log in</div>
            <div className="useroptiondropdown" id="signupoption" onClick={() => signuppagedisplay()}>Sign up</div>
        </div>
        <div className="useroption" id="useroptionloggedin">
            <div className="useroptiondropdown" id="profileoption" onClick={() => profilepagedisplay()}>Profile</div>
            <div className="useroptiondropdown" id="logoutoption" onClick={() => logout()}>Log out</div>
        </div>
        <div className="history" id="historytab">
            <MdCancel className="history-cancel" id="historycancelbutton" onClick={()=>historyoff()}/>
            <div>{loggedin ? exerciseHist.map((exercise) => (
                <div>
                    {} - {exercise.time} minutes - {exercise.part}
                </div>)) : "Please Log In"}
            </div>
        </div>
        <div className="userinfopage" id="loginpage">
                <FaUser className="userpageicon"/>
                <MdCancel className="user-cancel" onClick={()=>loginpageoff()}/>
                <input
                    type="email"
                    placeholder="Username/Email"
                    className="userpageinput"
                    onChange={(event) => 
                        {setLoginEmail(event.target.value)
                    }}
                    />
                <input
                    type="password"
                    placeholder="Password"
                    className="userpageinput"
                    onChange={(event) => 
                        {setLoginPassword(event.target.value)
                    }}
                    />
                <button className="userpagebutton" onClick={() => login()}>Log in</button>
        </div>
        <div className="userinfopage" id="signuppage">
                <MdCancel className="user-cancel" onClick={()=>signuppageoff()}/>
                <FaUser className="userpageicon"/>
                <input
                    type="email"
                    placeholder="Username/Email"
                    name="email"
                    className="userpageinput"
                    onChange={(event) => 
                        {setRegisterEmail(event.target.value)
                    }}
                    />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="userpageinput"
                    onChange={(event) => 
                        {setRegisterPassword(event.target.value)
                    }}
                />
                <button className="userpagebutton" onClick={() => register()}>Sign up</button>
        </div>
        <div className="userinfopage" id="profilepage">
            <MdCancel className="user-cancel" onClick={() => profilepageoff()}/>
            <FaUser className="userpageicon"/>
            <h2>Current User: {user?.email}</h2>
        </div>
    </section>
    )
}

export default Header