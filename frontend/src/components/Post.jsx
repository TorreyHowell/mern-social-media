import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import FavoriteIcon from '@mui/icons-material/Favorite'

function Post({ post }) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        marginTop: '10px',
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
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
        <CardMedia component="img" height="194" image={post.media} />
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
