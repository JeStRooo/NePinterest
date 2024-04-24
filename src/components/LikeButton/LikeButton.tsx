import React from 'react'
import IconButton from '@mui/material/IconButton'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import FavoriteIcon from '@mui/icons-material/Favorite'

interface LikeButtonProps {
  liked: boolean
  handleLike: () => void
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  liked,
  handleLike,
}) => (
  <IconButton onClick={handleLike}>
    {liked ? (
      <FavoriteIcon style={{ color: 'red' }} />
    ) : (
      <FavoriteBorderOutlinedIcon style={{ color: 'grey' }} />
    )}
  </IconButton>
)
