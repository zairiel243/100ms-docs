/* eslint-disable import/no-cycle */
/* eslint-disable global-require */
/* eslint-disable react/no-danger */
import Markdown from 'markdown-to-jsx';
import React from 'react';

import Basics from '../common/basics.md';
import Network from '../common/network.md';
import Token from '../common/token.md';
import TemplatesRoles from '../common/templates-and-roles.md';
import SecurityTokens from '../common/security-tokens.md';
import DomainsPorts from '../common/firewall-and-ports.md';
import LiveStreaming from '../common/live-streaming.md';
import Recordings from '../common/recordings.md';
import AdaptiveBitrate1 from "../common/adaptive-bitrate-1.md";
import AdaptiveBitrate2 from "../common/adaptive-bitrate-2.md";

const data = {
    basics: Basics,
    templatesAndRoles: TemplatesRoles,
    network: Network,
    token: Token,
    securityAndTokens: SecurityTokens,
    domainsAndPorts: DomainsPorts,
    liveStreaming: LiveStreaming,
    recordings: Recordings,

    /**
     * Adaptive bitrate docs are split into 2 parts because 3-backtick
     * code snippets in `md` files are not rendering well in mdx
     */
    adaptiveBitrate1: AdaptiveBitrate1,
    adaptiveBitrate2: AdaptiveBitrate2
};

interface Props {
    alias: keyof typeof data;
}

const Content = ({ alias }: Props) => {
    const str = data[alias];
    return <Markdown>{str}</Markdown>;
};

export default Content;
