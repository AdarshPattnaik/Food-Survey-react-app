import React from 'react'

export default function ContactForm() {

    const [user, setUser] = React.useState({
        name: "",
        email: "",
        age: "",
        orderMode: "",
        message: ""
    });

    // Order Frequency:
    const [radioBox, setRadioBox] = React.useState("");

    const [dailyRadio, setDailyRadio] = React.useState(false);
    const [weeklyRadio, setWeeklyRadio] = React.useState(false);
    const [monthlyRadio, setMonthlyRadio] = React.useState(false);

    const radioClick = (data) => {
        if (data === "Daily") {
            setRadioBox(data);
            setDailyRadio(true);
            setWeeklyRadio(false);
            setMonthlyRadio(false);
        }
        if (data === "Weekly") {
            setRadioBox(data);
            setDailyRadio(false);
            setWeeklyRadio(true);
            setMonthlyRadio(false);
        }
        if (data === "Monthly") {
            setRadioBox(data);
            setDailyRadio(false);
            setWeeklyRadio(false);
            setMonthlyRadio(true);
        }
    };

    // Meal Type:
    const [mealType, setMealType] = React.useState([]);
    const [b, setB] = React.useState(false);
    const [l, setL] = React.useState(false);
    const [s, setS] = React.useState(false);
    const [d, setD] = React.useState(false);
    const mealChange = (data) => {
        // Breakfast:
        if (data === "Breakfast") {
            if (!b) {
                setMealType([...mealType, data]);
                setB(!b);
            }
            else {
                setMealType(mealType.filter((elem) => {
                    return (elem !== data);
                }));
                setB(!b);
            }
        }
        // Lunch:
        if (data === "Lunch") {
            if (!l) {
                setMealType([...mealType, data]);
                setL(!l);
            }
            else {
                setMealType(mealType.filter((elem) => {
                    return (elem !== data);
                }));
                setL(!l);
            }
        }
        // Snacks:
        if (data === "Snacks") {
            if (!s) {
                setMealType([...mealType, data]);
                setS(!s);
            }
            else {
                setMealType(mealType.filter((elem) => {
                    return (elem !== data);
                }));
                setS(!s);
            }
        }
        // Dinner:
        if (data === "Dinner") {
            if (!d) {
                setMealType([...mealType, data]);
                setD(!d);
            }
            else {
                setMealType(mealType.filter((elem) => {
                    return (elem !== data);
                }));
                setD(!d);
            }
        }
    };

    let name, value;
    const getUserData = (event) => {
        name = event.target.name;
        value = event.target.value;

        setUser({ ...user, [name]: value });
    };

    const postData = async (e) => {
        e.preventDefault();

        const {
            name,
            email,
            age,
            orderMode,
            message
        } = user;

        const orderFrequency = radioBox;
        const userMealType = mealType;

        if (name && email && age && orderFrequency && userMealType && orderMode && message) {
            let res = await fetch(
                "https://food-delivery-survey-form-default-rtdb.firebaseio.com/FoodSurveyFormData.json",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        age,
                        orderFrequency,
                        userMealType,
                        orderMode,
                        message
                    })
                }
            );
            if (res) {
                setUser({
                    name: "",
                    email: "",
                    age: "",
                    orderMode: "",
                    message: ""
                });
                setRadioBox("");
                setMealType([]);
                setDailyRadio(false);
                setWeeklyRadio(false);
                setMonthlyRadio(false);
                setB(false);
                setL(false);
                setS(false);
                setD(false);
                alert("Thanks for being a part of our survey. Your review is sent successfully.")
            }
        } else {
            alert("Please fill all the data.")
        }
    };

    return (
        <>
            {/* <!-- Home Section --> */}
            <section id="home">

                {/* <!-- Short head --> */}
                <div className="head">

                    {/* <!-- Title head of the page --> */}
                    <h1 id="title">Food Delivery Survey Form</h1>

                    {/* <!-- Description --> */}
                    <h3 id="description">Your feedback would help us to improve our services</h3>

                </div>

                {/* <!-- Form --> */}
                <div className="container">

                    <form
                        method='POST'
                        action="backend.php"
                        id="survey-form">

                        {/* Name: */}
                        <div
                            className="form-group"
                            id="name">
                            <label
                                id="name-label"
                                for="name">
                                Name:
                            </label>

                            <input
                                required
                                value={user.name}
                                onChange={getUserData}
                                type="text"
                                name="name"
                                placeholder="Enter your name..." />
                        </div>

                        {/* Email: */}
                        <div
                            className="form-group"
                            id="email">
                            <label
                                id="email-label"
                                for="email">
                                E-mail:
                            </label>

                            <input
                                required
                                value={user.email}
                                onChange={getUserData}
                                type="email"
                                name="email"
                                autoComplete='off'
                                placeholder="Enter your email..." />
                        </div>

                        {/* Age: */}
                        <div
                            className="form-group"
                            id="number">
                            <label
                                id="number-label"
                                for="number">
                                Age:
                            </label>

                            <input
                                value={user.age}
                                onChange={getUserData}
                                type="number"
                                min="10"
                                max="99"
                                name="age"
                                placeholder="Age..." />
                        </div>

                        {/* Radio: Order Frequency */}
                        <div className="form-group">
                            <p> How often you order food online? </p>

                            <label>
                                <input
                                    className="radio-btn"
                                    value="Daily"
                                    onClick={(e) => radioClick(e.target.value)}
                                    type="radio"
                                    checked={dailyRadio}
                                    name="orderfreq" />
                                &nbsp; Daily
                            </label>

                            <label>
                                <input
                                    className="radio-btn"
                                    value="Weekly"
                                    onClick={(e) => radioClick(e.target.value)}
                                    type="radio"
                                    checked={weeklyRadio}
                                    name="orderfreq" />
                                &nbsp; Weekly
                            </label>

                            <label>
                                <input
                                    className="radio-btn"
                                    value="Monthly"
                                    onClick={(e) => radioClick(e.target.value)}
                                    type="radio"
                                    checked={monthlyRadio}
                                    name="orderfreq" />
                                &nbsp; Monthly
                            </label>
                        </div>

                        {/* CheckBox: Meal: */}
                        <div className="form-group">
                            <p> Which meal you typically order food online? </p>

                            <label>
                                <input
                                    value="Breakfast"
                                    onChange={(e) => mealChange(e.target.value)}
                                    type="checkbox"
                                    checked={b}
                                    name="Breakfast" />
                                &nbsp; Breakfast
                            </label>

                            <label>
                                <input
                                    value="Lunch"
                                    onChange={(e) => mealChange(e.target.value)}
                                    type="checkbox"
                                    checked={l}
                                    name="Lunch" />
                                &nbsp; Lunch
                            </label>

                            <label>
                                <input
                                    value="Snacks"
                                    onChange={(e) => mealChange(e.target.value)}
                                    type="checkbox"
                                    checked={s}
                                    name="Snacks" />
                                &nbsp; Snacks
                            </label>

                            <label>
                                <input
                                    value="Dinner"
                                    onChange={(e) => mealChange(e.target.value)}
                                    type="checkbox"
                                    checked={d}
                                    name="Dinner" />
                                &nbsp; Dinner
                            </label>
                        </div>

                        {/* Order Mode: */}
                        <div className="form-group">
                            <p className="general">
                                In general, how do you prefer to order food?
                            </p>

                            <select
                                value={user.orderMode}
                                onChange={getUserData}
                                name="orderMode"
                                id="dropdown">
                                <option style={{ color: "grey" }} selected>Select an option</option>
                                <option value="Mobile App">Mobile App</option>
                                <option value="Web Browser">Web Browser</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>

                        {/* Message: */}
                        <div className="form-group">
                            <p className="general">
                                Feel free to share your views over here:
                            </p>
                            <textarea
                                value={user.message}
                                onChange={getUserData}
                                name="message"
                                id="textarea"
                                cols="30"
                                rows="10"
                                placeholder="Enter your comments here..."></textarea>
                        </div>

                        {/* <!-- Submit Button --> */}
                        <div className="form-group">
                            <button
                                onClick={postData}
                                type="submit"
                                id="submit"> Submit </button>
                        </div>

                    </form>

                </div>

            </section>

            {/* <!-- Footer --> */}
            <footer id="foot">
                <div id="down">
                    &copy; Food Delivery Survey Form &bullet; All Rights Reserved | Design by Adarsh
                </div>
            </footer>
        </>
    );
};

