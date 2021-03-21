import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ShopIcon from '@material-ui/icons/ShoppingBasket';
import AppContext from '../helpers/AppContext';
import Badge from '@material-ui/core/Badge';
import Link from 'next/link';
import styled from 'styled-components'

const StyledTypography = styled(Typography)`
  margin-right: 25px;
`

export default function SearchAppBar() {
  const { itemsNumber } = useContext(AppContext)

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <StyledTypography variant="h6" noWrap>
            Shoppy Shop
          </StyledTypography>
          <Link href="/checkout">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
            >
              <Badge badgeContent={itemsNumber} color="secondary">
                <ShopIcon />
              </Badge>
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
