import React from 'react';
import { NotFound } from '../../NotFound/NotFound';
import { Helmet } from 'react-helmet';

const NotFoundPage: React.FC = () => {
  return (
    <>
        <Helmet>
            <title>Страница не найдена</title>
        </Helmet>
      <NotFound/>
    </>
  );
};

export default NotFoundPage;