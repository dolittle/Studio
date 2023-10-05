// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Template } from '@svgr/babel-plugin-transform-svg-component';

export const template: Template = ({ imports, interfaces, componentName, props, jsx, exports }, { tpl }) => tpl`
${imports};
import Box from '@mui/material/Box';

${interfaces};

const ${componentName} = (${props}) => (
  ${jsx}
);
 
${exports};
`;
