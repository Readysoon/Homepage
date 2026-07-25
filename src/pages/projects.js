import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Layout } from '@components';
import { IconBookmark } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const projects = [
  {
    title: 'Hitchpedia',
    tagline:
      'A shared, curl-able knowledge base of fixes for the errors developers and AI agents keep hitting.',
    slug: '/pensieve/hitchpedia',
    date: '2026-07',
    tags: ['Python', 'FastAPI', 'Postgres', 'Agents'],
  },
];

const StyledMainContainer = styled.main`
  & > header {
    margin-bottom: 100px;
    text-align: center;
  }

  .subtitle {
    color: var(--green);
    margin: 0 0 20px 0;
    font-size: clamp(var(--fz-sm), 4vw, var(--fz-md));
    font-family: var(--font-mono);
    font-weight: 400;
    line-height: 1.1;
  }

  footer {
    ${({ theme }) => theme.mixins.flexBetween};
    width: 100%;
    margin-top: 20px;
  }
`;

const StyledGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 15px;
  margin-top: 50px;
  position: relative;

  @media (max-width: 1080px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

const StyledProject = styled.li`
  transition: var(--transition);
  cursor: default;

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      .project__inner {
        transform: translateY(-7px);
      }
    }
  }

  a {
    position: relative;
    z-index: 1;
  }

  .project__inner {
    ${({ theme }) => theme.mixins.boxShadow};
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    height: 100%;
    padding: 2rem 1.75rem;
    border-radius: var(--border-radius);
    transition: var(--transition);
    background-color: var(--light-navy);

    header,
    a {
      width: 100%;
    }
  }

  .project__icon {
    ${({ theme }) => theme.mixins.flexBetween};
    color: var(--green);
    margin-bottom: 30px;
    margin-left: -5px;

    svg {
      width: 40px;
      height: 40px;
    }
  }

  .project__title {
    margin: 0 0 10px;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);

    a {
      position: static;

      &:before {
        content: '';
        display: block;
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
  }

  .project__desc {
    color: var(--light-slate);
    font-size: 17px;
  }

  .project__date {
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    text-transform: uppercase;
  }

  ul.project__tags {
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      line-height: 1.75;

      &:not(:last-of-type) {
        margin-right: 15px;
      }
    }
  }
`;

const formatDate = str => {
  const [y, m] = str.split('-');
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return `${months[parseInt(m, 10) - 1]} ${y}`;
};

const ProjectsPage = ({ location }) => {
  const revealTitle = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    sr.reveal(revealTitle.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <Layout location={location}>
      <Helmet title="Projects" />

      <StyledMainContainer>
        <header ref={revealTitle}>
          <h1 className="big-heading">Projects</h1>
          <p className="subtitle">Things I build on the side, mostly for fun</p>
        </header>

        <StyledGrid>
          {projects.map((project, i) => (
            <StyledProject key={i} ref={el => (revealProjects.current[i] = el)}>
              <div className="project__inner">
                <header>
                  <div className="project__icon">
                    <IconBookmark />
                  </div>
                  <h5 className="project__title">
                    <Link to={project.slug}>{project.title}</Link>
                  </h5>
                  <p className="project__desc">{project.tagline}</p>
                </header>

                <footer>
                  <span className="project__date">{formatDate(project.date)}</span>
                  <ul className="project__tags">
                    {project.tags.map((tag, j) => (
                      <li key={j}>#{tag}</li>
                    ))}
                  </ul>
                </footer>
              </div>
            </StyledProject>
          ))}
        </StyledGrid>
      </StyledMainContainer>
    </Layout>
  );
};

ProjectsPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default ProjectsPage;
