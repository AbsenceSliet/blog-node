'use strict';

import admin from './admin'


export default app => {
    app.use('/admin', admin)
}