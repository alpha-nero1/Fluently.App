import { Image, ImageProps } from "react-native";

const s3Uri = `https://s3.ap-southeast-2.amazonaws.com/cdn.fluently/`

type IStaticImageProps = {
    objectKey: string;
} & ImageProps

export const StaticImage = ({ objectKey, ...rest }: IStaticImageProps) => {
    return (
        <Image 
            {...rest}
            src={`${s3Uri}${objectKey}`}
            resizeMode={rest.resizeMode || 'contain'}
        />
    )
}