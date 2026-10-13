import { Card, CardContent, Stack, Typography } from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';

// Temporary stand-in for a page that has not been built yet.
function PagePlaceholder({ title }) {
  const { pathname } = useLocation();
  const params = useParams();
  const paramText = Object.entries(params)
    .map(([key, value]) => `${key} = ${value}`)
    .join(', ');

  return (
    <Stack spacing={2} sx={{ maxWidth: 720 }}>
      <Typography variant="h1">{title}</Typography>
      <Card>
        <CardContent>
          <Stack spacing={0.5}>
            <Typography variant="overline" color="text.tertiary">
              Placeholder page
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Current URL: {pathname}
            </Typography>
            {paramText && (
              <Typography variant="body2" color="text.secondary">
                Route params: {paramText}
              </Typography>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}

export default PagePlaceholder;