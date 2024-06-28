import React from "react"
import "./style.css"

export default function App({ children }: {
	children: React.ReactNode
}) {
	return <html>
		<head>
			<title>Lucky Fortunate Cones</title>
			<link rel="stylesheet" href="/style.css" />
		</head>
		<body data-id="body">
			{children}
		</body>
	</html>
}