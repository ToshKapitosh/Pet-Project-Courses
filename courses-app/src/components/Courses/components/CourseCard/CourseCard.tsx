import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { CourseCardType } from '../../../../types';
import { BUTTONS_TEXT } from '../../../../constants';
import { formatDuration } from '../../../../helpers/pipeDuration';
import { formatAuthors } from '../../../../helpers/authorFormatHelper';
// import { useSharedState } from '../../../../hooks/useSharedState';

import { Button } from '../../../../common/Button/Button';

import {
	StyledButtonWrapper,
	StyledCardWrapper,
	StyledDataWrapper,
	StyledInnerWrapper,
	StyledTextWrapper,
} from './CourseCard.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { deleteCourseRequest } from '../../../../store/courses/coursesSlice';
import useUserHook from '../../../../hooks/useUserHook';
import { selectAuthors } from '../../../../store/selectors';

const CourseCard: FC<CourseCardType> = ({ course }) => {
	// const { allAuthors, token, role } = useSharedState();
	const allAuthors = useAppSelector(selectAuthors);
	const { token, isAdmin } = useUserHook();
	const { id, title, duration, creationDate, description, authors } = course;

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const filteredAuthors = useMemo(() => {
		return authors.map((authorId) => {
			const author = allAuthors.find((author) => author.id === authorId);
			return author ? author.name : '';
		});
	}, [authors, allAuthors]);

	const deleteCourseHandler = () => {
		if (id && token) {
			dispatch(deleteCourseRequest({ id, token }));
		}
	};

	return (
		<StyledCardWrapper key={id}>
			<StyledTextWrapper>
				<h2>{title}</h2>
				<p>{description}</p>
			</StyledTextWrapper>
			<StyledDataWrapper>
				<StyledInnerWrapper>
					<p>
						<strong>Authors:</strong> {formatAuthors(filteredAuthors)}
					</p>
					<p>
						<strong>Duration:</strong> {formatDuration(duration)}
					</p>
					<p>
						<strong>Created:</strong> {creationDate}
					</p>
				</StyledInnerWrapper>
				<StyledButtonWrapper>
					<Button
						text={BUTTONS_TEXT.SHOW}
						onClick={() => navigate(`/courses/${id}`)}
					/>
					{isAdmin && (
						<>
							<Button
								text={<FontAwesomeIcon icon={faPen} />}
								onClick={() => navigate(`/courses/update/${id}`)}
							/>
							<Button
								text={<FontAwesomeIcon icon={faTrash} />}
								onClick={deleteCourseHandler}
							/>
						</>
					)}
				</StyledButtonWrapper>
			</StyledDataWrapper>
		</StyledCardWrapper>
	);
};

export default CourseCard;
