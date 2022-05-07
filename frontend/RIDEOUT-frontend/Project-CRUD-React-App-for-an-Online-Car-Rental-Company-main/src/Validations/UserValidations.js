const setError = (error) => {
    return {
        status: false,
        error: error
    }
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

const validateMobile = (mobile) => {
    return String(mobile)
        .toLowerCase()
        .match(
            /^[0-9]+$/
        );
}

const validateNIC = (nic) => {
    return String(nic)
        .toLowerCase()
        .match(
            /^[0-9]{9}[v|V]$/
        );
}

export const signUpValidations = (user) => {
    if (!user.name) {
        return setError("User Name is required.");
    } else if (user.name.length < 3) {
        return setError("User Name should have a minimum length of 3.");
    } else if (user.name.length > 255) {
        return setError("User Name should have a maximum length of 255.");
    } if (!user.email) {
        return setError("User Email is required.");
    } else if (!validateEmail(user.email)) {
        return setError("Please enter a valid email.");
    } else if (user.email.length > 255) {
        return setError("User email should have a maximum length of 255.");
    } else if (!user.password) {
        return setError("User password is required.");
    } else if (user.password.length < 6) {
        return setError("User password should have a minimum length of 6.");
    } else if (user.password.length > 16) {
        return setError("User password should have a maximum length of 16.");
    } else if (!user.mobile) {
        return setError("User mobile is required.");
    } else if (user.mobile.length !== 10) {
        return setError("User mobile length shoud be 10.");
    } else if (!validateMobile(user.mobile)) {
        return setError("User mobile should only contain numbers.");
    } else if (!user.nic) {
        return setError("User NIC is required.");
    } else if (user.nic.length !== 10) {
        return setError("User NIC length shoud be 10.");
    } else if (!validateNIC(user.nic)) {
        return setError("Please enter valid NIC.");
    } else if (!user.gender) {
        return setError("Please select the gender.");
    } else return {
        status: true,
        error: null
    }
}

export const signInValidations = (user) => {
    if (!user.email) {
        return setError("User Email is required.");
    } else if (!validateEmail(user.email)) {
        return setError("Please enter a valid email.");
    } else if (user.email.length > 255) {
        return setError("User email should have a maximum length of 255.");
    } else if (!user.password) {
        return setError("User password is required.");
    } else if (user.password.length < 6) {
        return setError("User password should have a minimum length of 6.");
    } else if (user.password.length > 16) {
        return setError("User password should have a maximum length of 16.");
    } else return {
        status: true,
        error: null
    }
}
