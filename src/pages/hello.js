import React from 'react'

function handleChange(event) {
    //console.log(event.target.value)

    var target = document.getElementById('#listItem');
    console.log(event.target)
    //console.log(target.value)
}

const Hello = () => (
	<div>
		<div id="listItem">sssss</div>
		<h3>Hello from app component</h3>

		<input type="text" value="sdfd" onChange={handleChange} />
	</div>
)

export default Hello