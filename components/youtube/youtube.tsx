import getYouTubeID from 'get-youtube-id';
interface Props {
    youtube_url: string
}

const YoutubeEmbed = ({ youtube_url }: Props) => {
    const id = getYouTubeID(youtube_url);

    return (
       
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${id}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
    )
}
export default YoutubeEmbed;