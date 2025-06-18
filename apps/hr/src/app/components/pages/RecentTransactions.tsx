
import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineOppositeContent,
    timelineOppositeContentClasses,
    TimelineSeparator,
} from '@mui/lab';
import { Link, Typography } from '@mui/material';

const RecentTransactions = () => {
  return (
    <>
        <Timeline
          className="theme-timeline"
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          sx={{
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.2,
            },
          }}
        >
            <TimelineItem>
                <TimelineOppositeContent>09:30 am</TimelineOppositeContent>
                <TimelineSeparator>
                <TimelineDot color="primary" variant="outlined" />
                <TimelineConnector/>
                </TimelineSeparator>
                <TimelineContent>Payment received from John Doe of $385.90</TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent>10:00 am</TimelineOppositeContent>
                <TimelineSeparator>
                <TimelineDot color="secondary" variant="outlined" />
                <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                <Typography fontWeight="600">New sale recorded</Typography>{' '}
                <Link href="/" underline="none">
                    #ML-3467
                </Link>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent>12:00 am</TimelineOppositeContent>
                <TimelineSeparator>
                <TimelineDot color="success" variant="outlined" />
                <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>Payment was made of $64.95 to Michael</TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent>09:30 am</TimelineOppositeContent>
                <TimelineSeparator>
                <TimelineDot color="warning" variant="outlined" />
                <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                <Typography fontWeight="600">New sale recorded</Typography>{' '}
                <Link href="/" underline="none">
                    #ML-3467
                </Link>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent>09:30 am</TimelineOppositeContent>
                <TimelineSeparator>
                <TimelineDot color="error" variant="outlined" />
                <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                <Typography fontWeight="600">New arrival recorded</Typography>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent>12:00 am</TimelineOppositeContent>
                <TimelineSeparator>
                <TimelineDot color="success" variant="outlined" />
                </TimelineSeparator>
                <TimelineContent>Payment Received</TimelineContent>
            </TimelineItem>
        </Timeline>
    </>
  );
};

export default RecentTransactions;
