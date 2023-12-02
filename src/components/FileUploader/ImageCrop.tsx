import { Button, Card, Col, Row } from 'react-bootstrap'
import Cropper, { ReactCropperElement } from 'react-cropper'
import Compressor from 'compressorjs'
import 'cropperjs/dist/cropper.css'
import { useRef, useState } from 'react'

interface ImageProps {
	onValidate: any
	url: any
}

const ImageCroper = ({ onValidate, url }: ImageProps) => {
	const [cropData1, setCropData1] = useState<number | undefined>(0)
	const [cropY, setCropY] = useState<number | undefined>(0)
	const [imageWidth, setImageWidth] = useState<number | undefined>(0)
	const [imageHeight, setImageHeight] = useState<number | undefined>(0)
	const [imageRotate, setImageRotate] = useState<number | undefined>(0)
	const [scaleX, setScaleX] = useState<number | undefined>(0)
	const [scaleY, setScaleY] = useState<number | undefined>(0)

	const cropperRef = useRef<ReactCropperElement>(null)

	const onCrop = () => {
		const cropper = cropperRef.current?.cropper
		// console.log(cropper.getCroppedCanvas().toDataURL());
		const ImageData = Math.ceil(cropper?.getData().x ?? 0)
		const ImageY = Math.ceil(cropper?.getData().y ?? 0)
		const ImageWidth = Math.ceil(cropper?.getImageData().width ?? 0)
		const ImageHeight = Math.ceil(cropper?.getImageData().height ?? 0)
		const ImageRotate = Math.ceil(cropper?.getImageData().rotate ?? 0)
		const ScaleX = Math.ceil(cropper?.getImageData().scaleX ?? 0)
		const ScaleY = Math.ceil(cropper?.getImageData().scaleY ?? 0)

		setCropData1(ImageData)
		setCropY(ImageY)
		setImageWidth(ImageWidth)
		setImageHeight(ImageHeight)
		setImageRotate(ImageRotate)
		setScaleX(ScaleX)
		setScaleY(ScaleY)
	}

	const urlToFile = (url: any) => {
		let arr = url.split(',')
		// console.log(arr)
		let mime = arr[0].match(/:(.*?);/)[1]
		let data = arr[1]

		let dataStr = atob(data)
		let n = dataStr.length
		let dataArr = new Uint8Array(n)

		while (n--) {
			dataArr[n] = dataStr.charCodeAt(n)
		}

		let file = new File([dataArr], 'File.jpg', { type: mime })

		return file
	}
	const getCropData = () => {
		if (typeof cropperRef.current?.cropper !== 'undefined') {
			new Compressor(
				urlToFile(cropperRef.current?.cropper.getCroppedCanvas().toDataURL()),
				{
					quality: 0.7, // 0.6 can also be used, but its not recommended to go below.
					success: (res: any) => {
						onValidate(res)
					},
				}
			)
		}
	}

	return (
		<>
			<Row>
				<Col xs={12}>
					<Card>
						<Card.Body>
							<Row>
								<Col lg={9}>
									<div className="img-container">
										<Cropper
											src={url}
											style={{ height: '100%', width: '100%' }}
											initialAspectRatio={10 / 10}
											dragMode="move"
											preview=".img-preview"
											guides={false}
											aspectRatio={10 / 10}
											crop={onCrop}
											ref={cropperRef}
											rotatable
										/>
									</div>
								</Col>
								<Col lg={3}>
									<div className="image-crop-preview clearfix">
										<div className="img-preview preview-lg rounded" />
										<div className="img-preview preview-md rounded" />
										<div className="img-preview preview-sm rounded" />
										<div className="img-preview preview-xs rounded" />
									</div>
									<div className="docs-data">
										<div className="input-group mt-2">
											<span className="input-group-text">X</span>
											<input
												type="text"
												className="form-control"
												id="dataX"
												placeholder="x"
												onChange={() => cropData1}
												value={cropData1}
											/>
											<span className="input-group-text">px</span>
										</div>
										<div className="input-group mt-2">
											<span className="input-group-text">Y</span>
											<input
												type="text"
												className="form-control"
												id="dataY"
												placeholder="y"
												onChange={() => cropY}
												value={cropY}
											/>
											<span className="input-group-text">px</span>
										</div>
										<div className="input-group mt-2">
											<span className="input-group-text">Width</span>
											<input
												type="text"
												className="form-control"
												id="dataWidth"
												placeholder="width"
												onChange={() => imageWidth}
												value={imageWidth}
											/>
											<span className="input-group-text">px</span>
										</div>
										<div className="input-group mt-2">
											<span className="input-group-text">Height</span>
											<input
												type="text"
												className="form-control"
												id="dataHeight"
												placeholder="height"
												onChange={() => imageHeight}
												value={imageHeight}
											/>
											<span className="input-group-text">px</span>
										</div>
										<div className="input-group mt-2">
											<span className="input-group-text">Rotate</span>
											<input
												type="text"
												className="form-control"
												id="dataRotate"
												placeholder="rotate"
												onChange={() => imageRotate}
												value={imageRotate}
											/>
											<span className="input-group-text">deg</span>
										</div>
										<div className="input-group mt-2">
											<span className="input-group-text">ScaleX</span>
											<input
												type="text"
												className="form-control"
												id="dataScaleX"
												placeholder="scaleX"
												onChange={() => scaleX}
												value={scaleX}
											/>
										</div>
										<div className="input-group mt-2">
											<span className="input-group-text">ScaleY</span>
											<input
												type="text"
												className="form-control"
												id="dataScaleY"
												placeholder="scaleY"
												onChange={() => scaleY}
												value={scaleY}
											/>
										</div>
										<div className="d-flex justify-content-center mt-2">
											<Button onClick={getCropData}>Save</Button>
										</div>
									</div>
								</Col>
							</Row>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	)
}
export default ImageCroper
