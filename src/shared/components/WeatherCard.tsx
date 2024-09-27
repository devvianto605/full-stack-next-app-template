
type WeatherCardProps = {
    // ...
    children: React.ReactNode
}

const WeatherCard = ({ children,  }: WeatherCardProps): JSX.Element => {
  return (
    <div className="">
     {children}
    </div>
  )
}

export default WeatherCard;