import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { CheckCircle, XCircle, AlertTriangle, Target, Brain } from 'lucide-react'
import { APIResponse } from '../lib/api'

interface AnalysisDetailsProps {
  apiResponse: APIResponse
}

export function AnalysisDetails({ apiResponse }: AnalysisDetailsProps) {
  const { gaps, rationale, coverage } = apiResponse

  return (
    <div className="space-y-6">
      {/* Rationale */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-primary" />
            <span>Analysis Rationale</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-neutral-text-secondary leading-relaxed">
            {rationale}
          </p>
        </CardContent>
      </Card>

      {/* Skills Analysis */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Matched Skills */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-700 dark:text-green-400">
              <CheckCircle className="w-5 h-5" />
              <span>Matched Skills</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {gaps.matched_skills.map((skill, index) => (
                <Badge key={index} className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800/50">
                  {skill}
                </Badge>
              ))}
            </div>
            {gaps.matched_skills.length === 0 && (
              <p className="text-neutral-text-secondary text-sm italic">
                No skills matched
              </p>
            )}
          </CardContent>
        </Card>

        {/* Missing Skills */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-700 dark:text-red-400">
              <XCircle className="w-5 h-5" />
              <span>Missing Skills</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {gaps.missing_skills.map((skill, index) => (
                <Badge key={index} className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800/50">
                  {skill}
                </Badge>
              ))}
            </div>
            {gaps.missing_skills.length === 0 && (
              <p className="text-neutral-text-secondary text-sm italic">
                All required skills present
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Coverage Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-primary" />
            <span>Coverage Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800/30">
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                {Math.round(coverage.must_have)}%
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-400">Must Have Skills</div>
            </div>
            <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800/30">
              <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                {Math.round(coverage.responsibilities)}%
              </div>
              <div className="text-sm text-orange-600 dark:text-orange-400">Responsibilities</div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800/30">
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                {Math.round(coverage.seniority_fit)}%
              </div>
              <div className="text-sm text-green-600 dark:text-green-400">Seniority Fit</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weak Evidence */}
      {(gaps.weak_evidence_for_responsibilities?.length ?? 0) > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-yellow-700 dark:text-yellow-400">
              <AlertTriangle className="w-5 h-5" />
              <span>Weak Evidence for Responsibilities</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {gaps.weak_evidence_for_responsibilities.map((responsibility, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-yellow-600 dark:text-yellow-400 mt-1">•</span>
                  <span className="text-neutral-text-secondary text-sm">
                    {responsibility}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

    </div>
  )
}
