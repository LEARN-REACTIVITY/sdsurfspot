loggedIn()
    if(localStorage.getItem('authToken') != null) {
        this.setState({isLoggedIn: true})
    }
loggedOut()
