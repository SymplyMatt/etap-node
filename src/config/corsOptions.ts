import allowedOrigins from "./allowedOrigins";

const corsOptions = {
    origin: (origin: string | undefined, callback: Function) => {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    optionsSuccessStatus: 200
};

export default corsOptions;