import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { blue } from '@mui/material/colors'
import FavoriteIcon from '@mui/icons-material/Favorite'
import useWindowDimensions from '../hooks/useWindowDimensions'
import { isMobile } from 'react-device-detect'
import { Box } from '@mui/system'

function Post({ post }) {
  const { width } = useWindowDimensions()

  const calculateWidth = () => {
    if (isMobile) {
      return width - 20
    }

    return 450
  }
  return (
    <Card
      sx={{
        margin: '10px 10px 0 10px',
        maxWidth: 500,
        minWidth: calculateWidth,
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
            {post.user.userName.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={post.user.userName}
        subheader={new Date(post.createdAt).toLocaleDateString('en-us', {
          weekday: 'short',
          year: '2-digit',
          month: 'short',
          day: 'numeric',
        })}
      />

      {post.media && (
        <Box
          id="card-box"
          sx={{
            padding: 1,
          }}
        >
          <a href={post.media} rel="noreferrer" target="_blank">
            <CardMedia
              href={post.media}
              component="img"
              height="250"
              image={post.media}
            />
          </a>
        </Box>
      )}

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}
export default Post
