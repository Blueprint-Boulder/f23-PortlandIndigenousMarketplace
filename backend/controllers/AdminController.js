const express = require('express');
const db = require('../database');

const getEventRequests = async (req, res, next) => {
    try {
        const requests = await db.manyOrNone(
            'SELECT * FROM EventRequests WHERE event_id = $1',
            [req.params.eventId],
        );
    
        if (requests.length) {
            res.locals.data = requests;
            next();
        } else {
            res.status(404).json({message: 'No requests found for this event.'});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

const getAllEventRequests = async (req, res, next) => {
    try {
        const requests = await db.manyOrNone(
            'SELECT * FROM EventRequests',
        );
    
        if (requests.length) {
            res.locals.data = requests;
            next();
        } else {
            res.status(404).json({message: 'No requests found for this event.'});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

const getViolations = async (req, res, next) => {
    try {
        const violations = await db.manyOrNone(
            'SELECT * FROM VendorViolations WHERE vendor_id = $1',
            [req.params.vendorId],
        );
    
        if (violations.length) {
            res.locals.data = violations;
            next();
        } else {
            res.status(404).json({message: 'No violations found for this vendor.'});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

const getAllViolations = async (req, res, next) => {
    try {
        const violations = await db.manyOrNone('SELECT * FROM VendorViolations');
    
        if (violations.length) {
            res.locals.data = violations;
            next();
        } else {
            res.status(404).json({message: 'No violations found.'});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

const createVendorViolation = async (req, res, next) => {
    try {
        await db.none(
            'INSERT INTO VendorViolations (vendor_id) VALUES ($1)',
            [req.params.vendorId],
        );
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

const deleteVendorViolation = async (req, res, next) => {
    try {
        await db.none(
            'DELETE FROM VendorViolations WHERE violation_id = $1',
            [req.params.violationId],
        );
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

const processEventRequest = async (req, res, next) => {
    try {
        await db.none(
            'UPDATE EventRequests SET approved = $1 WHERE request_id = $2',
            [req.body.approved, req.params.requestId],
        );
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

module.exports = {
    getEventRequests,
    getAllEventRequests,
    getViolations,
    getAllViolations,
    createVendorViolation,
    deleteVendorViolation,
    processEventRequest,
};