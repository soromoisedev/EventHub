export default function showBuyButton() {
	return (localStorage.getItem("role") === "user" || !localStorage.getItem("role"))
}