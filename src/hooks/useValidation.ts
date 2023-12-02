import React from 'react'
const useValidation = (data: any) => {
	const [inputs, setInputs] = React.useState(data)
	const [errors, setErrors] = React.useState<any>({})
	const handleOnChange = (text: any, input: any) => {
		setInputs((prevState: any) => ({ ...prevState, [input]: text }))
	}
	const hanldeError = (errorMessage: any, input: any) => {
		setErrors((prevState: any) => ({ ...prevState, [input]: errorMessage }))
	}

	const resetInput = () => {
		setInputs((prev:any) => !prev)
	}

	return {
		inputs,
		errors,
		handleOnChange,
		hanldeError,
		setInputs,
		resetInput,
	}
}

export default useValidation
