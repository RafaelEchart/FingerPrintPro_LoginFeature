import './style.css'

const SignUpForm = () => {
    console.log("hello")


    return(
        <div class="inputWrapper">
          <div class="form-wrapper">
            <form class="form-class" method="post">
              <input
                id="nameInput"
                required
                type="email"
                placeholder="Email or username"
                maxlength="15"
              />
              <input
                type="password"
                id="scoreInput"
                required
                placeholder="Password"
                
                
              />
              <button type="submit" form="pwgen-form" id="submitButton">
                Sign up
              </button>
             

            </form>
          </div>
        </div>
    )
}

export default SignUpForm;