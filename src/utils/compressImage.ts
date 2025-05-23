export const compressImage = async (
	file: any,
	maxSizeKB: number
): Promise<File> => {
	const imageBitmap = await createImageBitmap(file)

	const canvas = document.createElement('canvas')
	const ctx = canvas.getContext('2d')

	if (!ctx) {
		throw new Error('Unable to get canvas context')
	}

	canvas.width = imageBitmap.width
	canvas.height = imageBitmap.height
	ctx.drawImage(imageBitmap, 0, 0)

	let quality = 0.9
	let blob: Blob | null = null

	do {
		blob = await new Promise<Blob | null>((resolve) =>
			canvas.toBlob((b) => resolve(b), 'image/jpeg', quality)
		)

		if (!blob) throw new Error('Compression failed')

		if (blob.size / 1024 > maxSizeKB) {
			quality -= 0.1
		} else {
			break
		}
	} while (quality > 0.1)

	// Ici on est sûr que `blob` n'est pas null ou unknown
	return new File([blob], file.name, {
		type: 'image/jpeg',
		lastModified: Date.now(),
	})
}
