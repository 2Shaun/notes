(RFCS)[https://github.com/reactjs/rfcs/blob/bf51f8755ddb38d92e23ad415fc4e3c02b95b331/text/0000-server-components.md]

- server components can't use state or effects
- many current implementations have sequential round trips to fetch data, e.g., a parent component fetches, renders its child, then the child component fetches
